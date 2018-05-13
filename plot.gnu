set yrange [6:8]
plot '< tail -n 100 log.dat' using 1:2 with lines
pause 1
reread