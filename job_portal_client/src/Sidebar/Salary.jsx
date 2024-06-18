import React from 'react';

const Salary = ({ handleChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
        Salary Range (in k)
      </label>
      <div className="flex space-x-2">
        <input
          type="number"
          id="minSalary"
          name="minSalary"
          placeholder="Min"
          className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
        <span className="text-gray-600">-</span>
        <input
          type="number"
          id="maxSalary"
          name="maxSalary"
          placeholder="Max"
          className="w-1/2 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Salary;
