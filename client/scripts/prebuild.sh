#!/bin/sh

GIT_DIR=`git rev-parse --show-toplevel`
PUBLIC_DIR="${GIT_DIR}/client/public"

node "${GIT_DIR}/client/scripts/collect_licenses.js" > "${PUBLIC_DIR}/licenses.txt"