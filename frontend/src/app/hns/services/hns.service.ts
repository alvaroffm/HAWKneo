import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/api/api.service';

// Define interfaces for HNS data
export interface DataSource {
    id: string;
    name: string;
    type: string;
    description: string;
    status: 'active' | 'inactive' | 'processing';
}

export interface DataQualityMetric {
    id: string;
    name: string;
    value: number;
    unit: string;
    sourceId?: string;
}

export interface TransformationTask {
    id: string;
    name: string;
    status: 'completado' | 'pendiente' | 'en-progreso';
    description: string;
    sourceId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class HnsService {
    private basePath = 'hns';

    constructor(private apiService: ApiService) { }

    // Data ingestion methods
    getSources(): Observable<DataSource[]> {
        return this.apiService.get<DataSource[]>(`${this.basePath}/sources`);
    }

    getSource(id: string): Observable<DataSource> {
        return this.apiService.get<DataSource>(`${this.basePath}/sources/${id}`);
    }

    createSource(source: Omit<DataSource, 'id'>): Observable<DataSource> {
        return this.apiService.post<DataSource>(`${this.basePath}/sources`, source);
    }

    updateSource(id: string, source: Partial<DataSource>): Observable<DataSource> {
        return this.apiService.put<DataSource>(`${this.basePath}/sources/${id}`, source);
    }

    deleteSource(id: string): Observable<void> {
        return this.apiService.delete<void>(`${this.basePath}/sources/${id}`);
    }

    // Data quality methods
    getQualityMetrics(sourceId?: string): Observable<DataQualityMetric[]> {
        const params: any = {};
        if (sourceId) {
            params.sourceId = sourceId;
        }
        return this.apiService.get<DataQualityMetric[]>(`${this.basePath}/quality`, params);
    }

    // Data transformation methods
    getTransformationTasks(sourceId?: string): Observable<TransformationTask[]> {
        const params: any = {};
        if (sourceId) {
            params.sourceId = sourceId;
        }
        return this.apiService.get<TransformationTask[]>(`${this.basePath}/transformations`, params);
    }

    createTransformationTask(task: Omit<TransformationTask, 'id'>): Observable<TransformationTask> {
        return this.apiService.post<TransformationTask>(`${this.basePath}/transformations`, task);
    }

    updateTransformationTask(id: string, task: Partial<TransformationTask>): Observable<TransformationTask> {
        return this.apiService.put<TransformationTask>(`${this.basePath}/transformations/${id}`, task);
    }
} 