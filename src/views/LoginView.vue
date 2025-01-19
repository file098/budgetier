<template>
  <canvas ref="canvasRef" class="background-canvas"></canvas>
  <section>
    <Card>
      <template #title>Login</template>
      <template #content>
        <Form
          v-slot="$form"
          :resolver="resolver"
          :initialValues
          @submit="onFormSubmit"
          class="form"
        >
          <InputText name="email" type="text" placeholder="email" fluid />
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.email.error?.message }}</Message
          >
          <InputText
            name="password"
            type="password"
            placeholder="Password"
            fluid
          />
          <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.password.error?.message }}</Message
          >
          <Button type="submit" severity="secondary" label="Submit" />
        </Form>
      </template>
    </Card>
  </section>
</template>

<script setup lang="ts">
import { supabase } from "@/lib/supabase";
import { Form } from "@primevue/forms";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const loading = ref(false);

const initialValues = ref({
  email: "",
  password: "",
});

const resolver = (form: any) => {
  const errors: any = {};
  const values = form.values;

  if (!values.email) {
    errors.email = { message: "Email is required." };
  }

  if (!values.password) {
    errors.password = { message: "Password is required." };
  }

  return {
    errors,
    values: {
      email: values.email,
      password: values.password,
    },
  };
};

const onFormSubmit = (form: any) => {
  if (form.valid) {
    handleLogin(form.values.email, form.values.password);
  }
};

const handleLogin = async (email: string, password: string) => {
  try {
    loading.value = true;
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    router.push("/");
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};

const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;

const drawLine = () => {
  if (!canvasRef.value) return;
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  let x = 0;
  let y = height / 2;
  const speed = 2;
  const points: { x: number; y: number }[] = [];

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    points.push({ x, y });

    ctx.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[i + 1].x, points[i + 1].y);
    }
    ctx.strokeStyle = "white";
    ctx.stroke();

    x += speed;
    let direction = Math.random() > 0.5 ? 1 : -1;
    y += direction * Math.random() * 15;

    if (x > width) {
      x = 0;
      y = Math.random() * height;
      points.length = 0; // Reset points array
    }

    if (y < 0 || y > height) {
      y = Math.random() * height;
    }

    animationFrameId = requestAnimationFrame(draw);
  };

  draw();
};

onMounted(() => {
  if (canvasRef.value) {
    const dpr = window.devicePixelRatio || 1;
    const ctx = canvasRef.value.getContext("2d");
    ctx!.scale(dpr, dpr);
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;

    drawLine();
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped lang="scss">
.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

section {
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  & .form {
    width: 25rem;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
