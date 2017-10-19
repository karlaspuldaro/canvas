#!/bin/bash

#-------------------------------------------------------------
# IBM Confidential
# OCO Source Materials

# (C) Copyright IBM Corp. 2017
# The source code for this program is not published or
# otherwise divested of its trade secrets, irrespective of
# what has been deposited with the U.S. Copyright Office.
#-------------------------------------------------------------

set -e

WORKING_DIR="$PWD"
RELEASE="release"
MASTER="master"

# Update package.json version on master only
if [[ ${TRAVIS_BRANCH} == ${MASTER} ]]; then
	# In Travis the build uses a branch.  Switch to master to update package.json
	git checkout ${MASTER}
	git fetch origin
	git pull
	# Increment version in package.json for common-canvas.  Defaults to patch
	echo "Update patch version of common-canvas"
	cd ./canvas_modules/common-canvas
	npm version patch
	BUILDNUM=`node -p "require('./package.json').version"`
	cd $WORKING_DIR
	git status
	git add ./canvas_modules/common-canvas/package.json
	git commit -m "Update version for common-canvas to version $BUILDNUM [skip ci]"

	echo "Push changes to master"
	git push origin ${MASTER}
fi


cd ./canvas_modules/common-canvas
# Get the build number from the package
BUILDNUM=`node -p "require('./package.json').version"`
cd $WORKING_DIR

# Tag the builds before publishing
cd ./scripts
./tagBuild.sh $BUILDNUM
cd $WORKING_DIR

echo "Publishing common-canvas $BUILDNUM to NPM"
cd ./canvas_modules/common-canvas
if [[ ${TRAVIS_BRANCH} == ${MASTER} ]]; then
	# Update Artifactory npm repository for master builds
	echo "Publishing to Artifactory: ${ARTIFACTORY_NPM_REPO}"
	npm publish --registry ${ARTIFACTORY_NPM_REPO}
	cd $WORKING_DIR/scripts
#	./update_wml_canvas.sh $BUILDNUM
elif [[ ${TRAVIS_BRANCH} == ${RELEASE} ]]; then
	# Update Whitewater npm repository for master builds
	echo "Publishing to Whitewater NPM"
	npm publish --registry https://npm-registry.whitewater.ibm.com/
fi

cd $WORKING_DIR
