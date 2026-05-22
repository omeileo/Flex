export default [
  // Permissions for 'Traveler'
  { role_id: 1, permission_id: 1 }, // Book flights
  { role_id: 1, permission_id: 2 }, // Share flight details
  { role_id: 1, permission_id: 3 }, // View published offer requests
  { role_id: 1, permission_id: 4 }, // Accept offer requests
  { role_id: 1, permission_id: 5 }, // Deny offer requests
  { role_id: 1, permission_id: 6 }, // Accept item request
  { role_id: 1, permission_id: 7 }, // Deny item request
  { role_id: 1, permission_id: 8 }, // View item tracking information
  { role_id: 1, permission_id: 9 }, // Confirm purchasing of item
  { role_id: 1, permission_id: 10 }, // Confirm delivery of item to traveler
  { role_id: 1, permission_id: 11 }, // Confirm arrival at destination
  { role_id: 1, permission_id: 12 }, // Confirm delivery of item to shopper
  { role_id: 1, permission_id: 30 }, // View own notifications

  // Permissions for 'Shopper'
  { role_id: 2, permission_id: 13 }, // Submit offer requests
  { role_id: 2, permission_id: 3 }, // View published offer requests
  { role_id: 2, permission_id: 8 }, // View item tracking information
  { role_id: 2, permission_id: 14 }, // Cancel item request
  { role_id: 2, permission_id: 15 }, // Cancel offer requests
  { role_id: 2, permission_id: 12 }, // Confirm delivery of item to shopper
  { role_id: 2, permission_id: 16 }, // Accept item price change
  { role_id: 2, permission_id: 30 }, // View own notifications

  // Permissions for 'Admin'
  { role_id: 3, permission_id: 17 }, // View published offer requests for other users
  { role_id: 3, permission_id: 18 }, // View item tracking information for other users
  { role_id: 3, permission_id: 19 }, // Confirm delivery of item to traveler for other users
  { role_id: 3, permission_id: 20 }, // Confirm delivery of item to shopper for other users
  { role_id: 3, permission_id: 21 }, // Confirm arrival at destination for other users
  { role_id: 3, permission_id: 22 }, // Book flight for other users
  { role_id: 3, permission_id: 23 }, // Cancel flight for other users
  { role_id: 3, permission_id: 24 }, // View flights booked by all users
  { role_id: 3, permission_id: 25 }, // View all users
  { role_id: 3, permission_id: 26 }, // Send all notification types
  { role_id: 3, permission_id: 27 }, // Send email notifications
  { role_id: 3, permission_id: 28 }, // Send push notifications
  { role_id: 3, permission_id: 29 }, // Send SMS notifications
  { role_id: 3, permission_id: 30 }, // View own notifications
  { role_id: 3, permission_id: 31 } // View all user notifications
]
