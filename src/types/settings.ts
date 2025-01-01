export interface Settings {
  openai: {
    apiKey: string;
    model: string;
  };
  ollama: {
    url: string;
  };
  customGpt: {
    url: string;
    apiKey: string;
  };
  redis: {
    url: string;
    password: string;
  };
  nextcloud: {
    url: string;
    username: string;
    password: string;
  };
  rag: {
    embeddingModel: string;
    vectorStore: {
      type: 'weaviate' | 'qdrant' | 'pinecone';
      url: string;
      apiKey: string;
    };
    retrieval: {
      topK: number;
      similarityThreshold: number;
      mmrLambda: number;
    };
    chunking: {
      chunkSize: number;
      chunkOverlap: number;
      strategy: 'fixed' | 'paragraph' | 'sentence';
    };
  };
}
