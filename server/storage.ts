import {
  type User,
  type InsertUser,
  type CommunityReport,
  type InsertCommunityReport,
  type Simulation,
  type InsertSimulation,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createCommunityReport(report: InsertCommunityReport): Promise<CommunityReport>;
  getCommunityReports(): Promise<CommunityReport[]>;
  upvoteCommunityReport(id: string): Promise<CommunityReport | undefined>;
  
  createSimulation(simulation: InsertSimulation): Promise<Simulation>;
  getSimulations(): Promise<Simulation[]>;
  getSimulation(id: string): Promise<Simulation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private communityReports: Map<string, CommunityReport>;
  private simulations: Map<string, Simulation>;

  constructor() {
    this.users = new Map();
    this.communityReports = new Map();
    this.simulations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCommunityReport(insertReport: InsertCommunityReport): Promise<CommunityReport> {
    const id = randomUUID();
    const report: CommunityReport = {
      ...insertReport,
      id,
      latitude: insertReport.latitude ?? null,
      longitude: insertReport.longitude ?? null,
      status: "under-review",
      upvotes: 0,
      createdAt: new Date(),
    };
    this.communityReports.set(id, report);
    return report;
  }

  async getCommunityReports(): Promise<CommunityReport[]> {
    return Array.from(this.communityReports.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async upvoteCommunityReport(id: string): Promise<CommunityReport | undefined> {
    const report = this.communityReports.get(id);
    if (report) {
      report.upvotes += 1;
      this.communityReports.set(id, report);
    }
    return report;
  }

  async createSimulation(insertSimulation: InsertSimulation): Promise<Simulation> {
    const id = randomUUID();
    const simulation: Simulation = {
      ...insertSimulation,
      id,
      predictions: insertSimulation.predictions ?? null,
      createdAt: new Date(),
    };
    this.simulations.set(id, simulation);
    return simulation;
  }

  async getSimulations(): Promise<Simulation[]> {
    return Array.from(this.simulations.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getSimulation(id: string): Promise<Simulation | undefined> {
    return this.simulations.get(id);
  }
}

export const storage = new MemStorage();
