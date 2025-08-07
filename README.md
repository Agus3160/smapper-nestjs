#  Smappy

A lightweight, profile-based mapping library for NestJS that provides a simple way to transform objects between different types with support for context-aware mapping.

## Features

- 🚀 **Lightweight**: Minimal dependencies and footprint
- 🎯 **Type-safe**: Full TypeScript support with generic interfaces
- 🔧 **Decorator-based**: Easy to use with `@Mapper()` decorator
- 📁 **Auto-discovery**: Automatic mapper scanning from file paths
- 🎭 **Context-aware**: Support for context parameters in mapping
- 🏗️ **NestJS Integration**: Seamless integration with NestJS dependency injection

## Installation

```bash
npm install smappy
```

## Quick Start

### 1. Create a Mapper

```typescript
import { Mapper } from 'smappy';
import { IMapper } from 'smappy';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserDto {
  fullName: string;
  email: string;
}

interface UserMapperContext {
  includeEmail: boolean;
}

@Mapper()
export class UserMapper implements IMapper<User, UserDto, UserMapperContext> {
  map(source: User, context: UserMapperContext): UserDto {
    const fullName = `${source.firstName} ${source.lastName}`;
    
    return {
      fullName,
      email: context.includeEmail ? source.email : undefined,
    };
  }
}
```

### 2. Configure the Module

```typescript
import { Module } from '@nestjs/common';
import { MapperModule } from 'smappy';
import { UserMapper } from './mappers/user.mapper';

@Module({
  imports: [
    MapperModule.forRoot({
      paths: ['src/mappers/*.mapper.{ts,js}'], // Auto-scan mappers
      profiles: [UserMapper], // Or manually register mappers
      isGlobal: true // Global module
    }),
  ],
})
export class AppModule {}
```

### 3. Use in Your Service

```typescript
import { Injectable } from '@nestjs/common';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly mapper: UserMapper) {}

  async getUserDto(user: User): Promise<UserDto> {
    return this.mapper.map(user, { includeEmail: true });
  }
}
```

## API Reference

### `@Mapper()` Decorator

Marks a class as a mapper and makes it injectable in NestJS.

```typescript
@Mapper()
export class MyMapper implements IMapper<Source, Destination> {
  // Implementation
}
```

### `IMapper<S, D, P>` Interface

Generic interface for mapping objects from one type to another.

```typescript
interface IMapper<S = unknown, D = unknown, P = any> {
  map(source: S, context?: P): D;
}
```

**Generic Parameters:**
- `S`: Source type to map from
- `D`: Destination type to map to  
- `P`: Optional context parameter type

### `MapperModule` Configuration

#### `forRoot()` - Synchronous Configuration

```typescript
MapperModule.forRoot({
  paths: ['src/mappers/*.mapper.{ts,js}'], // Glob patterns to scan
  profiles: [UserMapper, ProductMapper], // Manual registration
  isGlobal: true // Mark the module as global
})
```

#### `forRootAsync()` - Asynchronous Configuration

```typescript
MapperModule.forRootAsync({
  useFactory: async (configService: ConfigService) => ({
    paths: configService.get('MAPPER_PATHS'),
    profiles: [UserMapper],
    isGlobal: true
  }),
  inject: [ConfigService],
})
```

## License

MIT License - see [LICENSE](LICENSE) file for details.