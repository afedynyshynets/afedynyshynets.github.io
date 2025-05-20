import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        todo: {
            type: Object,
            required: true,
        },
        index: Number,
    },
});
