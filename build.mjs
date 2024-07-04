import dts from 'bun-plugin-dts'
// import envPlugin from 'bun-plugin-env-types'
await Bun.build({
  entrypoints: ['./src/index.ts'],
  // target: 'bun',
  outdir: './dist',
  minify: true,
  // sourcemap: true, 
  plugins: [dts()]
})
