jest.mock("@/lib/repositories/jobRepository", () => ({
  jobRepository: {
    findJobsByIds: jest.fn(),
    create: jest.fn(),
    deleteByIds: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
    updateStatusById: jest.fn(),
  },
}));

const { jobRepository } = require("@/lib/repositories/jobRepository");
const { jobService } = require("@/lib/services/jobService");

describe("jobService", () => {
  let consoleLogSpy;

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listJobs", () => {
    it("should delegate to repository with provided filters", async () => {
      const filters = { search: "dev", page: 2, limit: 5, userId: 10 };
      const jobs = [{ id: 1 }];
      jobRepository.findJobsByIds.mockResolvedValue(jobs);

      const result = await jobService.listJobs(filters);

      expect(jobRepository.findJobsByIds).toHaveBeenCalledWith(filters);
      expect(result).toEqual(jobs);
    });
  });

  describe("createJob", () => {
    it("should create a job when userId is provided", async () => {
      const payload = {
        title: "Backend Developer",
        type: "CLT",
        description: "Responsible for building APIs",
        requirements: "Node.js, SQL",
        location: "Remote",
        salaryRange: "10k-12k",
        userId: 1,
      };
      const createdJob = { id: 123, ...payload };
      jobRepository.create.mockResolvedValue(createdJob);

      const result = await jobService.createJob(payload);

      expect(jobRepository.create).toHaveBeenCalledWith({
        title: payload.title,
        type: payload.type,
        description: payload.description,
        requirements: payload.requirements,
        location: payload.location,
        salaryRange: payload.salaryRange,
        userId: payload.userId,
      });
      expect(result).toEqual(createdJob);
    });

    it("should throw when userId is missing", async () => {
      const payload = {
        title: "Backend Developer",
        type: "CLT",
        description: "Responsible for building APIs",
        requirements: "Node.js, SQL",
        location: "Remote",
        salaryRange: "10k-12k",
      };

      await expect(jobService.createJob(payload)).rejects.toThrow();
      expect(jobRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("deleteJobs", () => {
    it("should delete jobs by ids", async () => {
      const ids = [1, 2, 3];
      jobRepository.deleteByIds.mockResolvedValue({ count: 3 });

      const result = await jobService.deleteJobs(ids);

      expect(jobRepository.deleteByIds).toHaveBeenCalledWith(ids);
      expect(result).toEqual({ count: 3 });
    });

    it("should throw when ids is empty", async () => {
      await expect(jobService.deleteJobs([])).rejects.toThrow("Nenhuma vaga selecionada");
      expect(jobRepository.deleteByIds).not.toHaveBeenCalled();
    });
  });

  describe("updateJob", () => {
    it("should update job after verifying existence", async () => {
      const id = 5;
      const data = { title: "Updated title" };
      const existingJob = { id };
      const updatedJob = { id, ...data };
      jobRepository.findById.mockResolvedValue(existingJob);
      jobRepository.updateById.mockResolvedValue(updatedJob);

      const result = await jobService.updateJob(id, data);

      expect(jobRepository.findById).toHaveBeenCalledWith(id);
      expect(jobRepository.updateById).toHaveBeenCalledWith(id, data);
      expect(result).toEqual(updatedJob);
    });

    it("should throw when job does not exist", async () => {
      jobRepository.findById.mockResolvedValue(null);

      await expect(jobService.updateJob(99, {})).rejects.toThrow("Vaga");
      expect(jobRepository.updateById).not.toHaveBeenCalled();
    });
  });

  describe("updateStatus", () => {
    it("should update status when job exists", async () => {
      const id = 7;
      const status = "CANCELLED";
      const job = { id };
      const updated = { id, status };
      jobRepository.findById.mockResolvedValue(job);
      jobRepository.updateStatusById.mockResolvedValue(updated);

      const result = await jobService.updateStatus(id, status);

      expect(jobRepository.findById).toHaveBeenCalledWith(id);
      expect(jobRepository.updateStatusById).toHaveBeenCalledWith(id, status);
      expect(result).toEqual(updated);
    });

    it("should throw when job is missing", async () => {
      jobRepository.findById.mockResolvedValue(null);

      await expect(jobService.updateStatus(11, "PAUSED")).rejects.toThrow("Vaga");
      expect(jobRepository.updateStatusById).not.toHaveBeenCalled();
    });
  });

  describe("getJobById", () => {
    it("should return job when found", async () => {
      const job = { id: 2 };
      jobRepository.findById.mockResolvedValue(job);

      const result = await jobService.getJobById(2);

      expect(jobRepository.findById).toHaveBeenCalledWith(2);
      expect(result).toEqual(job);
    });

    it("should throw when job is not found", async () => {
      jobRepository.findById.mockResolvedValue(null);

      await expect(jobService.getJobById(3)).rejects.toThrow("Vaga");
    });
  });
});
