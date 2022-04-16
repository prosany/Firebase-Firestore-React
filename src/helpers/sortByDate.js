export default function sortByDate(arr) {
  let sortedArray = [...arr].sort(function compare(a, b) {
    var dateA = new Date(a.created_On);
    var dateB = new Date(b.created_On);
    return dateB - dateA;
  });
  return sortedArray;
}
