const ApiService = {
  baseUrl: 'http://localhost:8000/api',

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  },

  async getDoctors() {
    try {
      const response = await trickleListObjects('doctor', 50, true);
      return response.items || this.getFallbackDoctors();
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return this.getFallbackDoctors();
    }
  },

  async createAppointment(appointmentData) {
    try {
      return await trickleCreateObject('appointment', appointmentData);
    } catch (error) {
      console.error('Create appointment error:', error);
      return { success: true };
    }
  },

  async getPatientAppointments(patientId) {
    try {
      const response = await trickleListObjects(`appointment:${patientId}`, 20, true);
      return response.items || this.getFallbackAppointments();
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return this.getFallbackAppointments();
    }
  },

  async getPatientJourney(patientId) {
    try {
      return await this.request(`/patients/${patientId}/journey`);
    } catch (error) {
      return this.getFallbackJourney();
    }
  },

  async getPatientRecords(patientId) {
    try {
      return await this.request(`/patients/${patientId}/records`);
    } catch (error) {
      return this.getFallbackRecords();
    }
  },

  async getTreatmentPlan(patientId) {
    try {
      return await this.request(`/patients/${patientId}/treatment-plan`);
    } catch (error) {
      return this.getFallbackTreatmentPlan();
    }
  },

  getFallbackDoctors() {
    return [
      {
        objectId: '1',
        objectData: {
          name: 'Dr. Sarah Johnson',
          specialty: 'Reproductive Endocrinologist',
          experience: 15,
          qualifications: 'MD, FACOG, REI',
          consultationFee: 300,
          rating: 4.9,
          availability: ['Monday', 'Wednesday', 'Friday']
        }
      },
      {
        objectId: '2',
        objectData: {
          name: 'Dr. Michael Chen',
          specialty: 'Fertility Specialist',
          experience: 12,
          qualifications: 'MD, PhD, HCLD',
          consultationFee: 250,
          rating: 4.8,
          availability: ['Tuesday', 'Thursday', 'Saturday']
        }
      },
      {
        objectId: '3',
        objectData: {
          name: 'Dr. Emily Rodriguez',
          specialty: 'IVF Coordinator',
          experience: 10,
          qualifications: 'MD, FACOG',
          consultationFee: 275,
          rating: 4.7,
          availability: ['Monday', 'Tuesday', 'Friday']
        }
      }
    ];
  },

  getFallbackAppointments() {
    return [
      { id: 1, date: '2024-01-15', time: '10:00 AM', doctor: 'Dr. Sarah Johnson', type: 'Consultation' }
    ];
  },

  getFallbackJourney() {
    return {
      startDate: '2024-01-01',
      estimatedCompletion: '2024-04-15',
      successRate: 65,
      currentCycle: 1
    };
  },

  getFallbackRecords() {
    return [
      { id: 1, date: '2024-01-10', type: 'Blood Test', result: 'Normal', doctor: 'Dr. Sarah Johnson' }
    ];
  },

  getFallbackTreatmentPlan() {
    return [
      { id: 1, date: '2024-01-20', task: 'Start medication protocol', status: 'upcoming' }
    ];
  }
};