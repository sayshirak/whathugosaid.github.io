#!/usr/bin/env bash
PORT=4000
# 如果没有 lsof，尝试用 ss
if command -v lsof >/dev/null 2>&1; then
  PID=$(lsof -tiTCP:${PORT} -sTCP:LISTEN)
else
  PID=$(ss -ltnp 2>/dev/null | awk -v p=":${PORT}" '$4~p { gsub(/.*pid=|,.*/,"",$6); print $6 }' | head -n1)
fi

if [ -n "$PID" ]; then
  echo "发现占用端口 ${PORT} 的进程 PID=${PID}，正在优雅终止..."
  sudo kill $PID
  sleep 1
  # 若仍存在则强杀
  if ( (command -v lsof >/dev/null 2>&1 && lsof -tiTCP:${PORT} -sTCP:LISTEN) || ss -ltnp 2>/dev/null | grep -q ":${PORT}" ); then
    echo "优雅终止失败，强制杀掉 PID=${PID}"
    sudo kill -9 $PID
    sleep 1
  fi
fi

echo "启动 Jekyll（端口 ${PORT}）..."
bundle exec jekyll serve --livereload --host 0.0.0.0 --port ${PORT} --baseurl ""

