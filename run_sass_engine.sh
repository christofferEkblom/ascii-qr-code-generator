#!/usr/bin/env bash

 gem install sass --conservative;

cd $PWD/public/scss;

sass --watch main.scss:main.min.css --style compressed --watch | sass --watch main.scss:main.css --watch
