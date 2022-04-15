        <?php

        $f = fopen("test.txt", "r");

        // Read line from the text file and write the contents to the client
$line1=fgets($f);
$line2=fgets($f);
$line3=fgets($f);
// echo $line1;

        fclose($f);

        ?>
