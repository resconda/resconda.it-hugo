#!/bin/bash

ROOT=$(cd `dirname "$0"`; pwd)

pos_idx = 0
function parse_positional() {
    case $pos_idx in
        0) GDOC_NAME=$1;;
        *) echo "Unknown positional argument: $1"; exit 1;;
    esac
    pos_idx=$((pos_idx + 1))
}

while [[ $# -gt 0 ]]; do
    case $1 in
        -c) CREDENTIALS_OPT="-c $2"; shift;;
        -t) TOKEN_OPT="-t $2"; shift;;
        -o) OUTPUT_OPT="-o $2"; shift;;
        *) parse_positional "$1";;
    esac
    shift
done

tmp=`mktemp -d`

python $ROOT/gdrive.py $CREDENTIALS_OPT $TOKEN_OPT -o ${tmp} "$GDOC_NAME" && \
    python $ROOT/pillole.py $OUTPUT_OPT ${tmp}

exit $?