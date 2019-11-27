#include <stdint.h>
typedef uint64_t u64;			typedef uint32_t u32;
typedef uint16_t u16;			typedef uint8_t u8;
typedef int64_t i64;			typedef int32_t i32;
typedef int16_t i16;			typedef int8_t i8;

// globals
u8 __heap_base;
u32 heap_address = (u32)&__heap_base;

// wasm-export
u32 init()
{
	return (u32)(&__heap_base);
}

// wasm-export
u32 square(u32 a)
{
	return a * a;
}

// wasm-export
u32 add(u32 a, u32 b)
{
	return a + b;
}

void* alloc(int n)
{
	u32 r = heap_address;
	heap_address += n;
	return (void *)r;
}