CURRENT_DIR=$(shell pwd)

TAG=latest
ENV_TAG=latest

pull-proto-module:
	git submodule update --init --recursive

update-proto-module:
	git submodule update --remote --merge

copy-proto-module:
	rm -rf ${CURRENT_DIR}/protos
	rsync -rv --exclude=.git ${CURRENT_DIR}/tm_protos/* ${CURRENT_DIR}/protos