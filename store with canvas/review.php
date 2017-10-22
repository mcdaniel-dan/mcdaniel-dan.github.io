<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>CS 213 - Week 07: eCommerce Review Page</title>
    <link rel="stylesheet" type="text/css" href="store.css">
</head>
<body>
<div id="review">
  <h1 id="reviewTitle">Review Your Order</h1>
<?php

    echo "<p>   Name: <br>"    . $_POST['fullname'] . "</p>";
    echo "<p>Address: <br>"    . $_POST['address']  . "<br>";
    echo $_POST['city'] . ", " . $_POST['state']    . " " . $_POST['zip'] . "</p>";
    $phone = $_POST['phone'];
    echo "<p>  Phone: <br> ("
       . substr($phone, 0, 3) . ") "
       . substr($phone, 3, 3) . "-"
       . substr($phone,6) . "</p>";
    echo "Items" . "<table>" . $_POST['cart'] . "</table>";
    //echo "Total: "   . $_POST['total'];
    //
    echo "<p>" . $_POST['total'] . "</p>";
    $exp = explode("/", $_POST['exp']);
    echo "<p>Credit Card Expiration: "
      . date('F', mktime(0, 0, 0, $exp[0], 10))
      . " " . $exp[1] . "</p>";

echo '<form action="confirm.php" method="post">
  <input name="confirm" type="submit" value="Confirm">
  <input name="cancel"  type="submit" value="Cancel">
</form>'
?>
</div>
</body>
</html>
