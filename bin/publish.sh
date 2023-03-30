#!/bin/bash

root_dir="$(cd "$(dirname "$0")" && cd ../ && pwd)"
package_dir=$root_dir/packages
version="$(< "$root_dir/lerna.json" grep '"version"' | sed 's/^.*"version"://g' | sed 's/["|,]//g')"

echo publishing version "$version"

function publish() {
  pkg_version="$(< "$1/package.json" grep '"version"' | sed 's/^.*"version"://g' | sed 's/["|,]//g')"
  if [ "$version" = "$pkg_version" ]; then
    cd "$1" || return
    npm publish --access=public
  fi
}

for file in "$package_dir"/*; do
  publish "$file"
done
