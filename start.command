#!/bin/sh
# Finder may launch Terminal with a minimal PATH.
PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
export PATH
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1 || ! node -e "process.exit(Number(process.versions.node.split('.')[0]) >= 22 ? 0 : 1)" >/dev/null 2>&1; then
  printf '\n未找到 Node.js 22 或更新版本。\n请打开 https://nodejs.org/zh-cn/download 安装 Node.js 22 或更新版本。\n安装完成后关闭此窗口，再次双击 start.command。\n'
  printf '\n按回车关闭。'
  read -r answer
  exit 1
fi
node scripts/bootstrap.mjs
result=$?
printf '\n按回车关闭。'
read -r answer
exit "$result"
