import { computed } from 'vue';

export default function useTodayPresenter() {
    const now = computed(() => new Date());

    const formattedToday = computed(() => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return now.value.toLocaleDateString('en-EN', options);
    });

    const formattedNowTime = computed(() => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return now.value.toLocaleString(undefined, options);
    });

    return {
        now,
        formattedToday,
        formattedNowTime,
    };
}