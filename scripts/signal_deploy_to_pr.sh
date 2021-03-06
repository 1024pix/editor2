#!/bin/bash -e

[ "$REVIEW_APP" != "true" ] && {
	echo '$REVIEW_APP is not true. I will not post a message to GitHub. Bye !'
	exit 0
}

[ -z $APP ] && {
	echo 'FATAL: $APP is absent'
	exit 1
}

[ -z $GITHUB_USER ] && {
	echo 'FATAL: $GITHUB_USER is absent'
	exit 1
}

[ -z $GITHUB_USER_TOKEN ] && {
	echo 'FATAL: $GITHUB_USER_TOKEN is absent'
	exit 1
}

PR_NUMBER=$(echo $APP | grep -Po '(?<=-pr)\d+')
RA_APP_URL="https://pix-lcms-review-pr$PR_NUMBER.osc-fr1.scalingo.io"
RA_API_URL="https://pix-lcms-review-pr$PR_NUMBER.osc-fr1.scalingo.io/api/"

MESSAGE_PREFIX="I'm deploying this PR to these urls:"

existing_comments=$(curl -Ssf -u $GITHUB_USER:$GITHUB_USER_TOKEN \
	"https://api.github.com/repos/1024pix/pix-editor/issues/${PR_NUMBER}/comments")

if [[ $existing_comments == *"${MESSAGE_PREFIX}"* ]]; then
	echo 'INFO: found a matching comment on the PR, not posting another one.'
else
	curl -Ssf -u $GITHUB_USER:$GITHUB_USER_TOKEN \
		-X POST "https://api.github.com/repos/1024pix/pix-editor/issues/${PR_NUMBER}/comments" \
		--data "{\"body\":\"$MESSAGE_PREFIX\n\n- App: $RA_APP_URL\n- API: $RA_API_URL\n\n Please check it out!\"}"
fi
