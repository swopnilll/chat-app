export const fetchAllUsers = async () => {
  try {
    // Get your local IP (e.g., 192.168.0.101)
    const response = await fetch(
      "http://localhost:5001/intellectachatapp/us-central1/getAllUsers"
    );

    const users = await response.json();
    console.log("Response from Firebase Function:", users);

    return users;
  } catch (error) {
    console.error("Error calling Firebase Function:", error);
  }
};
