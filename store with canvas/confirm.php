<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>CS 213 - Week 07: eCommerce Confirmation Page</title>
    <link rel="stylesheet" type="text/css" href="store.css">
</head>
<body>
<div id="confirm">
<h1>Order Confirmation</h1>
<?php
// Write a PHP program to return an HTML document which is a Purchase Review page. This will accept all the user data from the initial form and present it to the user in an easy to understand way. The purchase review page must have the following:
//
// Title & Headings: The page should be well formatted and organized with an appropriate title and headings. The details of how you do this are up to you.
// Name: The user's first and last name.
// Address: The user's address, presented in an easy-to-read way.
// Phone: The user's phone number.
// Items: A list of the items selected for purchase and their respective costs.
// Total: The total cost of all the items being purchased.
// Payment: The credit card type and expiration date. Display the expiration date with month and year, such as "January 2013."
// Confirm & Cancel: At the bottom of the page, have a form element with an action element referencing the second PHP program (the Confirmation Page). There will be two submit buttons: one to confirm the purchase and one to cancel the purchase. Both of these will re-submit all the information presented on the Review Page.

if (isset($_POST['confirm'])) {
  echo "Thank you for your order!";
} else {
  echo "We're sorry you cancelled your order.  Please come again!";
}

//     echo "Name: "    . $_POST['fullname'];
//     echo "Address: " . $_POST['address'];
//     echo "Phone: "   . $_POST['phone'];
//     echo "Items: "   . "<table>" . $_POST['cart'] . "</table>";
//     //echo "Total: "   . $_POST['total'];
//     echo "Credit Card Expiration: " . $_POST['exp'];
//
// echo '<form action="confirm.php" method="post">
//   <input name="confirm" type="submit" value="Confirm">
//   <input name="cancel"  type="submit" value="Cancel">
//   <input name="name"    type="hidden" value=' . $_POST['fullname'] . ';>
//   <input name="address" type="hidden" value=' . $_POST['address']  . ';>
//   <input name="phone"   type="hidden" value=' . $_POST['phone']    . ';>
//   <input name="cart"    type="hidden" value=' . $_POST['cart']     . ';>
//   <input name="exp"     type="hidden" value=' . $_POST['exp']      . ';>
// </form>'

?>
<p>We sincerely appreciate your business.</p>
<p>Kindest regards,</p>
<p>The Box Shop</p>
</div>
</body>
</html>
