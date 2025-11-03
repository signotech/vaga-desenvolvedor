jest.mock("@/lib/services/jobService", () => ({
  jobService: {
    listJobs: jest.fn(),
    createJob: jest.fn(),
    deleteJobs: jest.fn(),
  },
}));

const { jobService } = require("@/lib/services/jobService");
const { GET, POST, DELETE } = require("@/app/api/jobs/route");

describe("Jobs API route handlers", () => {
  let consoleErrorSpy;
  let consoleLogSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/jobs", () => {
    it("returns jobs with 200 status on success", async () => {
      const jobs = [{ id: 1, title: "Backend Developer" }];
      jobService.listJobs.mockResolvedValue(jobs);
      const request = {
        url: "http://localhost/api/jobs?search=dev&page=2&limit=10&userId=15",
      };

      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({ jobs });
      expect(jobService.listJobs).toHaveBeenCalledWith({
        search: "dev",
        page: "2",
        limit: "10",
        userId: "15",
      });
    });

    it("returns 500 when service throws", async () => {
      jobService.listJobs.mockRejectedValue(new Error("boom"));
      const request = { url: "http://localhost/api/jobs" };

      const response = await GET(request);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body).toEqual({ message: "Erro ao buscar vagas" });
    });
  });

  describe("POST /api/jobs", () => {
    it("creates a job and returns 201", async () => {
      const job = { id: 1, title: "Backend Developer" };
      jobService.createJob.mockResolvedValue(job);
      const payload = {
        title: "Backend Developer",
        type: "CLT",
        description: "Responsible for building APIs",
        requirements: "Node.js, SQL",
        location: "Remote",
        salaryRange: "10k-12k",
        userId: 7,
      };
      const request = {
        url: "http://localhost/api/jobs",
        json: jest.fn().mockResolvedValue(payload),
      };

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(201);
      expect(body).toEqual({
        job,
        message: "Vaga criada com sucesso",
      });
      expect(jobService.createJob).toHaveBeenCalledWith(
        expect.objectContaining({
          title: payload.title,
          userId: payload.userId,
        }),
        payload.userId
      );
    });

    it("returns 400 with validation errors", async () => {
      const invalidPayload = {
        title: "a",
        type: "CLT",
        description: "short",
        userId: 1,
      };
      const request = {
        url: "http://localhost/api/jobs",
        json: jest.fn().mockResolvedValue(invalidPayload),
      };

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.message).toContain("Erro");
      expect(jobService.createJob).not.toHaveBeenCalled();
    });

    it("returns 500 when service throws", async () => {
      jobService.createJob.mockRejectedValue(new Error("boom"));
      const payload = {
        title: "Backend Developer",
        type: "CLT",
        description: "Responsible for building APIs",
        requirements: "Node.js, SQL",
        location: "Remote",
        salaryRange: "10k-12k",
        userId: 7,
      };
      const request = {
        url: "http://localhost/api/jobs",
        json: jest.fn().mockResolvedValue(payload),
      };

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body).toEqual({ message: "Erro ao criar vaga" });
    });
  });

  describe("DELETE /api/jobs", () => {
    it("deactivates jobs and returns 200", async () => {
      jobService.deleteJobs.mockResolvedValue({ count: 2 });
      const request = {
        url: "http://localhost/api/jobs",
        json: jest.fn().mockResolvedValue({ ids: ["1", "2"] }),
      };

      const response = await DELETE(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual({
        message: "Vaga(s) desativada(s) com sucesso",
      });
      expect(jobService.deleteJobs).toHaveBeenCalledWith([1, 2]);
    });

    it("returns 400 when repository throws targeted error", async () => {
      jobService.deleteJobs.mockRejectedValue(new Error("Nenhuma vaga selecionada"));
      const request = {
        url: "http://localhost/api/jobs",
        json: jest.fn().mockResolvedValue({ ids: [] }),
      };

      const response = await DELETE(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body).toEqual({ message: "Nenhuma vaga selecionada" });
    });

    it("returns 500 on unexpected errors", async () => {
      jobService.deleteJobs.mockRejectedValue(new Error("boom"));
      const request = {
        url: "http://localhost/api/jobs",
        json: jest.fn().mockResolvedValue({ ids: [1] }),
      };

      const response = await DELETE(request);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body).toEqual({ message: "Erro ao desativar vaga(s)" });
    });
  });
});
