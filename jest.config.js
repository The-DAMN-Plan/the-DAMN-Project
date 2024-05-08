module.exports = {
    // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        // Handle module aliases (if used in your project)
        '^@components/(.*)$': '<rootDir>/src/components/$1'
    },
    transform: {
        // Transform files with 'babel-jest'
        '^.+\\.[tj]sx?$': 'babel-jest'
    }
};
