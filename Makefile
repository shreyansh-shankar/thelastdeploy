# Makefile — The Last Deploy agent
.PHONY: build run sync start stop check status login logout clean install

build:
	cd agent && go get golang.org/x/term && go build -o ../bin/tld .

# Install to /usr/local/bin so `tld` works from anywhere.
# Requires sudo on most systems.
install: build
	cp bin/tld /usr/local/bin/tld
	@echo "Installed: /usr/local/bin/tld"

# Quick dev targets — run from repo root
sync: build
	./bin/tld sync

start: build
	./bin/tld start $(ID)

stop: build
	./bin/tld stop

check: build
	./bin/tld check

status: build
	./bin/tld status

login: build
	./bin/tld login

logout: build
	./bin/tld logout

clean:
	rm -rf bin/