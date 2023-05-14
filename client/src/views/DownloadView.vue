<template>
  <BaseView>
    <v-container>
      <v-row align="center">
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="Название календаря"
            v-model="fileName"
            outlined
            :disabled="isDownloading"
          ></v-text-field>
          <v-btn
            color="primary"
            @click="downloadFile"
            :loading="isDownloading"
            block
          >
            Скачать календарь
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </BaseView>
</template>

<script>
import { ref } from "vue";
import BaseView from "@/components/BaseView.vue";

export default {
  name: "DownloadComponent",
  components: {
    BaseView,
  },
  setup() {
    const fileName = ref("");
    const isDownloading = ref(false);

    const downloadFile = async () => {
      if (!fileName.value) {
        alert("Please enter a file name.");
        return;
      }

      isDownloading.value = true;

      try {
        // Replace with your server's API endpoint
        const apiUrl = "https://yourserver.com/api/download";

        // Send the file name to the server
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: fileName.value }),
        });

        if (!response.ok) {
          throw new Error("Error downloading the file.");
        }

        // Handle the downloaded file (e.g., save it, display it, etc.)
        const fileBlob = await response.blob();
        const fileUrl = URL.createObjectURL(fileBlob);

        // Create an anchor element to download the file
        const anchor = document.createElement("a");
        anchor.href = fileUrl;
        anchor.download = fileName.value;
        anchor.click();

        URL.revokeObjectURL(fileUrl);
      } catch (error) {
        alert(error.message);
      } finally {
        isDownloading.value = false;
      }
    };

    return {
      fileName,
      isDownloading,
      downloadFile,
    };
  },
};
</script>
