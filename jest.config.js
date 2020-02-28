module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  rootDir: './',
  // setupFiles: [
  //   '<rootDir>/tests/setup.jest.ts',
  // ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json',
  ],
  moduleNameMapper: {
    '@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
}
