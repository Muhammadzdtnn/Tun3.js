<button id="openAdButton">للتواصل مع صاحبة الإعلان اضغط هنا</button>

  <div id="modal" class="modal">
    <div class="modalDialog">
      <p id="modalMessage"></p>
      <div class="grantButtons">
        <input type="button" value="موافق" onclick="closeModal()">
      </div>
    </div>
  </div>

  <p id="status"></p>

  <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
  <script>
    window.googletag = window.googletag || { cmd: [] };

    function showRewardedAd() {
      let rewardedSlot;
      let rewardPayload;

      googletag.cmd.push(() => {
        // إزالة فتحة الإعلان القديمة إذا كانت موجودة
        if (rewardedSlot) {
          googletag.destroySlots([rewardedSlot]);
        }

        rewardedSlot = googletag.defineOutOfPageSlot(
          "/22697551224/Ads_full",
          googletag.enums.OutOfPageFormat.REWARDED,
        );

        if (rewardedSlot) {
          rewardedSlot.addService(googletag.pubads());

          googletag.pubads().addEventListener("rewardedSlotReady", (event) => {
            event.makeRewardedVisible();
            displayModal();
            
            // غلق الإعلان بعد 30 ثانية تلقائيًا
            setTimeout(() => {
              if (rewardedSlot) {
                dismissRewardedAd();
              }
            }, 30000); // 30000 ميلي ثانية = 30 ثانية
          });

          googletag.pubads().addEventListener("rewardedSlotClosed", () => {
            dismissRewardedAd();
          });

          googletag.enableServices();
          googletag.display(rewardedSlot);
        } else {
          updateStatus("الإعلانات المكافئة غير مدعومة في هذه الصفحة.");
        }
      });

      function dismissRewardedAd() {
        if (rewardPayload) {
          displayModal("grant", `لقد حصلت على مكافأة ${rewardPayload.amount} ${rewardPayload.type}!`);
          rewardPayload = null;
        } else {
          displayModal();
        }

        if (rewardedSlot) {
          googletag.destroySlots([rewardedSlot]);
        }
      }

      function displayModal(type = "", message = "") {
        const modal = document.getElementById("modal");
        modal.removeAttribute("data-type");

        if (type) {
          document.getElementById("modalMessage").textContent = message;
          modal.setAttribute("data-type", type);
        }
      }

      function updateStatus(message) {
        document.getElementById("status").textContent = message;
      }
    }

    document.getElementById("openAdButton").addEventListener("click", showRewardedAd);

    function closeModal() {
      document.getElementById("modal").removeAttribute("data-type");
    }
  </script>
