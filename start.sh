#!/bin/sh
nohup redis-server & 
sleep 3 & 
node index.js