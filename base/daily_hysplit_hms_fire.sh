#!/bin/bash
#BSUB -o /lfs/h2/emc/ptmp/Ho-Chun.Huang/batch.logs/hyspt_hms_fire_20200128.out
#BSUB -e /lfs/h2/emc/ptmp/Ho-Chun.Huang/batch.logs/hyspt_hms_fire_20200128.err
#BSUB -n 1
#BSUB -J jhyspt_hms_fire
#BSUB -q debug
#BSUB -P HYS-T2O
#BSUB -W 00:29
#BSUB -R span[ptile=1]
#BSUB -R rusage[mem=200]
#BSUB -x
###BSUB -a poe
##
##  Provide fix date daily Hysplit data processing
##
   echo "submit job on dev machine m71a3"
   . ~/.bashrc
   cd /lfs/h2/emc/physics/save/${USER}/IDL/hysplit_fire
   bash run.cron_hysplit_hms_fire.sh 20200128 20200128 x x title
exit
