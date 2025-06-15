import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  type: 'CLT' | 'PJ' | 'Freelancer';
  status: 'active' | 'paused';
  createdAt: string;
  description?: string;
}

const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const fetchJobs = async () => {
    try {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 800));

      const mockJobs: Job[] = [
        {
          id: '1',
          title: 'Desenvolvedor React',
          type: 'CLT',
          status: 'active',
          createdAt: '2024-06-10',
          description: 'Vaga para desenvolvedor React com experiência...'
        },
        {
          id: '2',
          title: 'Designer UX/UI',
          type: 'PJ',
          status: 'active',
          createdAt: '2024-06-09'
        },
        {
          id: '3',
          title: 'Consultor Marketing',
          type: 'Freelancer',
          status: 'paused',
          createdAt: '2024-06-08'
        }
      ];

      setJobs(mockJobs);

    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || job.type === filterType;
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDelete = async (jobId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?');

    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/jobs/${jobId}`, {
          method: 'DELETE',
        });

        setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-gray-200 h-20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          onClick={() => console.log('Create new job')}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Job
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All types</option>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="Freelancer">Freelancer</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {jobs.length === 0 ? 'No jobs found' : 'No jobs match the filters'}
            </h3>
            <p className="text-gray-500 mb-4">
              {jobs.length === 0 ? 'Start by creating your first job' : 'Try adjusting the filters'}
            </p>
            {jobs.length === 0 && (
              <button 
                onClick={() => console.log('Create job')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create First Job
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        job.type === 'CLT' ? 'bg-blue-100 text-blue-800' :
                        job.type === 'PJ' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {job.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.status === 'active' ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Created on {new Date(job.createdAt).toLocaleDateString('en-US')}
                    </p>
                    {job.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {job.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => console.log('View details', job.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 rounded"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => console.log('Edit', job.id)}
                      className="p-2 text-gray-400 hover:text-green-600 rounded"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(job.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredJobs.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-2 text-sm border rounded hover:bg-gray-50" disabled>
              Previous
            </button>
            <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-2 text-sm border rounded hover:bg-gray-50" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsList;
