#!/bin/sh

error() {
  echo $1 >&2
  exit 1
}

# Required variables. Automatically set when executed using firebase-tools emulators:exec
[ -n "${GCLOUD_PROJECT}" ] || error "GCLOUD_PROJECT not set"
[ -n "${FIREBASE_FIRESTORE_EMULATOR_ADDRESS}" ] || error "FIREBASE_FIRESTORE_EMULATOR_ADDRESS not set"

# E.g. http://localhost:8080/emulator/v1/projects/poolscore-1973:ruleCoverage
COVERAGE_URL="http://${FIREBASE_FIRESTORE_EMULATOR_ADDRESS}/emulator/v1/projects/${GCLOUD_PROJECT}:ruleCoverage"
REPORT_DIR=`mktemp -d`
JSON_REPORT="${REPORT_DIR}/rule_coverage.json"
LCOV_REPORT="${REPORT_DIR}/lcov.info"
RULES_FILE=firestore.rules


# Execute Tests
npx jest || error "Tests failed"

# Fetch Coverage Report
curl $COVERAGE_URL > $JSON_REPORT

# Convert to Lcov
npx firebase-rules-coverage $JSON_REPORT --rules-file $RULES_FILE --output $REPORT_DIR

# Check coverage
npx lcov-total $LCOV_REPORT --gte=100

[ $? -eq 0 ] || error "Coverage <100%"