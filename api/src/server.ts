import app from './app';

const PORT: number = 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
