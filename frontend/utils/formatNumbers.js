export default function formatNumber(num) {
  if (num >= 1_000_000_000) {
    // Billions
    let formattedNum = (num / 1_000_000_000).toFixed(1);
    formattedNum = formattedNum.replace(".", ",");
    return formattedNum + "B";
  } else if (num >= 1_000_000) {
    let formattedNum = (num / 1_000_000).toFixed(1);
    formattedNum = formattedNum.replace(".", ",");
    return formattedNum + "M";
  } else if (num >= 1_000) {
    let formattedNum = (num / 1_000).toFixed(1);
    formattedNum = formattedNum.replace(".", ",");
    return formattedNum + "K";
  }

  return num.toString();
}
