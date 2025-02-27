export default function OverallScore(overallScore) {
  return (
    <div className="w-full flex justify-between items-center p-4 border rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Overall Performance</h3>
        <p className="text-gray-500 text-sm">Based on multiple parameters</p>
      </div>
      <div className="text-right">
        <CircularProgress value={overallScore} />
      </div>
    </div>
  );
}
