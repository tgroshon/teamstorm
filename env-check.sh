if [ "$NODE_ENV" = "production" ]
then
  if [ -d "node_modules/gulp" ]; then
    echo "Build Deps present"
    exit 0
  fi
  npm run autobuild
fi

echo "Skipping Build Deps on Non-prod environment"
exit 0
