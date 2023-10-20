#!/bin/sh

GIT_DIR=`git rev-parse --show-toplevel`
ASSET_DIR="${GIT_DIR}/client/src/assets"

node "${GIT_DIR}/client/scripts/collect_licenses.js" > "${ASSET_DIR}/licenses.json"