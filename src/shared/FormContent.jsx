import { memo } from 'react';

// eslint-disable-next-line react/display-name
const FormContent = memo(
  ({ formData, handleInputChange, handleResumeUpload, handleRemoveFile, handleSubmit, resume, error }) => (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-600 font-medium mb-2">Upload Resume</label>
        <input
          type="file"
          accept=".pdf"
          onChange={handleResumeUpload}
          className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {resume && (
          <div className="mt-2 flex items-center gap-4">
            <p className="text-sm text-gray-500">{resume.name}</p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-500 text-sm font-medium underline hover:text-red-700"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {['Job Role', 'Industry'].map((field) => (
        <div key={field}>
          <label className="block text-gray-600 font-medium mb-2">{field}</label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleInputChange}
            placeholder={`Enter ${field}`}
            className="block w-full p-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        disabled={!resume || error}
      >
        Start Interview
      </button>
    </form>
  )
);

export default FormContent;
