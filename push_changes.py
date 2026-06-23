#!/usr/bin/env python3
"""
OSS Website — CTA Update Script
Commits intake.html (new file) and updates 'Start with Overwatch' → 'Discuss Your Requirements'
across all 13 HTML files, routing the button to intake.html instead of contact.html.

Usage:
  1. Create a GitHub PAT at https://github.com/settings/tokens (needs 'repo' scope)
  2. Run:  python3 push_changes.py YOUR_PAT_HERE
"""

import sys
import json
import base64
import urllib.request
import urllib.error
import time

# ── Config ──────────────────────────────────────────────────────────────
REPO   = "unshaven534/oss-website"
BRANCH = "main"

FILES_TO_UPDATE = [
    "index.html",
    "packages.html",
    "services.html",
    "why-oss.html",
    "faq.html",
    "referral.html",
    "industry-fnb.html",
    "industry-workshop.html",
    "industry-warehouse.html",
    "blog/bizsafe-level-3-guide.html",
    "blog/mom-compliance-checklist.html",
    "blog/mom-inspection-guide.html",
    "blog/stop-work-order-cost.html",
]

OLD_TEXT  = 'Start with Overwatch'
NEW_TEXT  = 'Discuss Your Requirements'
OLD_HREF  = 'href="contact.html" class="btn btn-ghost"'
NEW_HREF  = 'href="intake.html" class="btn btn-primary"'

INTAKE_HTML_PATH = "intake.html"

# ── Helpers ──────────────────────────────────────────────────────────────
def api(path, token, method="GET", data=None):
    url = f"https://api.github.com/repos/{REPO}/contents/{path}"
    req = urllib.request.Request(url, method=method)
    req.add_header("Authorization", f"token {token}")
    req.add_header("Accept", "application/vnd.github.v3+json")
    req.add_header("Content-Type", "application/json")
    if data:
        req.data = json.dumps(data).encode()
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  HTTP {e.code}: {body[:200]}")
        return None

def get_file(path, token):
    return api(path, token)

def put_file(path, token, content_str, sha, message):
    b64 = base64.b64encode(content_str.encode()).decode()
    return api(path, token, method="PUT", data={
        "message": message,
        "content": b64,
        "sha": sha,
        "branch": BRANCH,
    })

def create_file(path, token, content_str, message):
    b64 = base64.b64encode(content_str.encode()).decode()
    return api(path, token, method="PUT", data={
        "message": message,
        "content": b64,
        "branch": BRANCH,
    })

# ── Main ──────────────────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    token = sys.argv[1].strip()

    # 1. Commit intake.html
    print(f"\n── Committing {INTAKE_HTML_PATH} ──")
    try:
        with open("intake.html", "r", encoding="utf-8") as f:
            intake_content = f.read()
    except FileNotFoundError:
        print("ERROR: intake.html not found in current directory.")
        print("Download it from the Claude conversation and place it here.")
        sys.exit(1)

    existing = get_file(INTAKE_HTML_PATH, token)
    if existing and "sha" in existing:
        print(f"  intake.html already exists (sha={existing['sha'][:8]}), updating...")
        result = put_file(INTAKE_HTML_PATH, token, intake_content, existing["sha"],
                          "Add intake form — pre-qualification before pricing")
    else:
        print("  intake.html is new, creating...")
        result = create_file(INTAKE_HTML_PATH, token, intake_content,
                             "Add intake form — pre-qualification before pricing")

    if result:
        print(f"  ✓ Committed intake.html")
    else:
        print("  ✗ Failed to commit intake.html — check token scope")
        sys.exit(1)

    time.sleep(0.5)  # be gentle with the API

    # 2. Update CTA in all 13 files
    print(f"\n── Updating CTA button in {len(FILES_TO_UPDATE)} files ──")
    ok = 0
    for path in FILES_TO_UPDATE:
        print(f"  {path} ...", end=" ")
        res = get_file(path, token)
        if not res or "content" not in res:
            print("SKIP (file not found)")
            continue

        sha = res["sha"]
        content = base64.b64decode(res["content"]).decode("utf-8")

        if OLD_TEXT not in content:
            print("already updated")
            continue

        # Replace button text
        updated = content.replace(OLD_TEXT, NEW_TEXT)
        # Replace href+class for the CTA button (contact.html → intake.html, ghost → primary)
        updated = updated.replace(OLD_HREF, NEW_HREF)

        if updated == content:
            print("no change (text found but href pattern didn't match exactly)")
            # Still update the text even if href didn't match
            pass

        result = put_file(path, token, updated, sha,
                          f"CTA: 'Discuss Your Requirements' → intake.html")
        if result:
            print("✓")
            ok += 1
        else:
            print("✗ failed")

        time.sleep(0.3)

    print(f"\n── Done: {ok}/{len(FILES_TO_UPDATE)} files updated ──")
    print("Cloudflare will pick up changes within ~60 seconds.")
    print("Check https://www.overwatch.com.sg to verify.")

if __name__ == "__main__":
    main()
