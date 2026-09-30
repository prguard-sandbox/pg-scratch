export const logger = {
  info: (msg, fields = {}) => process.stdout.write(JSON.stringify({ level: 'info', msg, ...fields }) + '\n'),
  error: (msg, fields = {}) => process.stderr.write(JSON.stringify({ level: 'error', msg, ...fields }) + '\n'),
};
