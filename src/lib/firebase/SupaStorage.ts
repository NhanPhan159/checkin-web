import { supaConfigStorage } from "@/constants";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SupabaseHelper {
  private client: SupabaseClient;
  private bucket: string;

  constructor(url: string, key: string, bucket: string) {
    this.client = createClient(url, key);
    this.bucket = bucket;
  }

  async uploadImage(file: Blob, email: string): Promise<string | null> {
    const fileName = `${Date.now()}-${email}`;

    const { error } = await this.client.storage
      .from(this.bucket)
      .upload(fileName, file, {
        contentType: "image/png",
      });

    if (error) throw error;

    const { data } = this.client.storage
      .from(this.bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}

const supabaseClientInstance = new SupabaseHelper(
  supaConfigStorage.supabaseUrl,
  supaConfigStorage.publicKey,
  supaConfigStorage.bucket,
);

export default supabaseClientInstance;
