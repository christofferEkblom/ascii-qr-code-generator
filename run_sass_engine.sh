#!/usr/bin/env bash

 gem install sass --conservative;

cd $PWD/public/scss;

sass main.scss:main.min.css --style compressed --watch | sass main.scss:main.css --watch
