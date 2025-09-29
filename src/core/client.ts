// src/core/client.ts
import { TalentSession } from './session';
import { TalentSessionConfig, TalentConnectionOptions } from './types';

export class DeepTalent {
  private apiUrl: string;
  
  constructor(config: { apiUrl?: string } = {}) {
    this.apiUrl = config.apiUrl || 'https://api.deeptalent.io';
  }

  /**
   * Create a new talent session
   */
  createSession(): TalentSession {
    return new TalentSession();
  }

  /**
   * Create session with server-side token generation
   */
  async createSessionWithAuth(config: TalentSessionConfig): Promise<{
    session: TalentSession;
    connectionOptions: TalentConnectionOptions;
  }> {
    // Call your DeepTalent API to get session token
    const response = await fetch(`${this.apiUrl}/v1/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`);
    }

    const { sessionId, wsUrl, token } = await response.json();
    
    const session = new TalentSession();
    const connectionOptions: TalentConnectionOptions = {
      wsUrl,
      token,
      autoConnect: false
    };

    return { session, connectionOptions };
  }

  /**
   * Static factory method for quick setup
   */
  static async connect(config: TalentSessionConfig & { 
    apiUrl?: string; 
    autoConnect?: boolean; 
  }): Promise<TalentSession> {
    const client = new DeepTalent({ apiUrl: config.apiUrl });
    const { session, connectionOptions } = await client.createSessionWithAuth(config);
    
    if (config.autoConnect !== false) {
      await session.connect(connectionOptions);
    }
    
    return session;
  }
}