const convertMonth = (date) => {
  // Convert "Agustus" to "August". Using "Agustus" make new Date() error
  if (date.split(" ")[1] === "Agustus") {
    const arr2 = date.split(" ");
    arr2[1] = "August";
    return arr2.join(" ");
  } else if (date.split(" ")[1] !== "Agustus") {
    return date;
  }
};

export default convertMonth;
