module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Handle module aliases (if used in your project)
        '^@components/(.*)$': '<rootDir>/src/components/$1'
    }
}
