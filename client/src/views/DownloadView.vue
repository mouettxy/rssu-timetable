<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-sheet rounded="lg">
            <v-list rounded="lg">
              <v-list-item link to="/">
                <v-list-item-title> Главная </v-list-item-title>
              </v-list-item>
              <v-list-item link to="/settings">
                <v-list-item-title> Настройки </v-list-item-title>
              </v-list-item>
              <v-list-item link to="/download">
                <v-list-item-title> Скачать </v-list-item-title>
              </v-list-item>

              <v-divider class="my-2"></v-divider>

              <v-list-item link color="grey-lighten-4">
                <v-list-item-title> Выйти </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-sheet>
        </v-col>

        <v-col>
          <v-sheet
            min-height="calc(100vh - 32px)"
            class="sheet pa-4"
            rounded="lg"
          >
            <v-container>
              <v-row align="center">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="File Name"
                    v-model="fileName"
                    outlined
                    :disabled="isDownloading"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-btn
                    color="primary"
                    @click="downloadFile"
                    :loading="isDownloading"
                  >
                    Download
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DownloadComponent",
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
