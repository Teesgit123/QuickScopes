/*
    List of validation rules for the user object
    1, username must be a string
    2, username must be between 8 and 20 characters long
    3, username must contain letters, numbers, or underscores
    4, the hashedpassword must be at least 12 characters long
    5, the email must be in the correct format
    6, the phone number must be formatted correctly
    7, the first name and last name must be a believable length
    8, the full name must have only letters
    9, the date must be in the proper format
    10, the date must not be in the future
    11, the isSupplier input must be a boolean value
*/

export const validateUser = (userData: any) => {
  // 1st - username must be a string, and between 8-20 characters long
  if (typeof userData.username !== "string") {
    return "Username must be a string";
  }
  if (userData.username.length < 8) {
    return "Username must be at least 8 characters long";
  }

  if (userData.username.length > 20) {
    return "Username must be no longer than 20 characters";
  }

  // 2nd - username must contain only letters, numbers, or underscores
  if (!/^[a-zA-Z0-9_]+$/.test(userData.username)) {
    return "Username must contain letters, numbers, or underscores";
  }

  // 3rd - the hashed password must be at least 12 characters long
  if (typeof userData.hashedPassword !== "string") {
    return "Hashed password must be a string";
  }

  if (userData.hashedPassword.length < 12) {
    return "Hashed password must be at least 12 characters long";
  }

  // 4th - check for a valid email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (
    typeof userData.email !== "string" ||
    !emailPattern.test(userData.email)
  ) {
    return "Invalid email address";
  }

  // 5th - check for a valid phone number format
  const phonePattern = /^[0-9]{10,15}$/;
  if (
    typeof userData.phoneNumber !== "string" ||
    !phonePattern.test(userData.phoneNumber)
  ) {
    return "Invalid phone number. Must contain only digits and be between 10-15 characters long.";
  }

  // 6th - check for a real name, between 3-25 characters long

  const nameCheck = /^[a-zA-Z]+$/;
  if (
    typeof userData.firstName !== "string" ||
    userData.firstName.length < 3 ||
    userData.firstName.length > 25
  ) {
    return "First name must be between 3 and 25 characters.";
  }

  if (
    typeof userData.lastName !== "string" ||
    userData.lastName.length < 2 ||
    userData.lastName.length > 25
  ) {
    return "Last name must be between 2 and 25 characters.";
  }

  if (
    !nameCheck.test(userData.firstName) ||
    !nameCheck.test(userData.lastName)
  ) {
    return "Your name must not include numbers";
  }

  // 7th - Ensure the date is a valid format not in the future

  if (typeof userData.joinDate !== "string") {
    return "The joinDate must be a string in ISO format";
  }
  const joinDate = new Date(userData.joinDate);
  console.log(typeof joinDate, typeof userData.joinDate);

  if (isNaN(joinDate.getTime()) || joinDate > new Date()) {
    return "The joinDate must be a valid date and not be in the future";
  }
  // 8th - Ensure that isSupplier value is in fact boolean
  if (typeof userData.isSupplier !== "boolean") {
    return "isSupplier field must be a boolean value";
  }
};
